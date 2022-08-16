from bs4 import BeautifulSoup
from selenium import webdriver
import time
from webdriver_manager.chrome import ChromeDriverManager
import re
from pymongo import MongoClient
import os
import time

class Item:
    def __init__(self) -> None:
        self.img: str = None
        self.name: str = None
        self.href: str = None
        self.price: float = None
        self.type: str = None
        self.size_list: list = []
        self.color_list: list = []
    def to_dict(self) -> dict:
        return (self.__dict__)

global driver
#enable environment variables here
DB_USER = os.environ.get('DB_USERNAME')
DB_USER = DB_USER if DB_USER is not None else 'e-commerce'
DB_PASS = os.environ.get('DB_PASSWORD')
DB_PASS = DB_PASS if DB_PASS is not None else 'P6gbkQPwUZGbGazB'

myclient = MongoClient(f'mongodb+srv://{DB_USER}:{DB_PASS}@cluster0.wexky.mongodb.net/?retryWrites=true&w=majority')
mydb = myclient['ClothingE-Commerce']

collections: list = []

def render_page(url):
    driver.get(url)
    time.sleep(.25)
    r = driver.page_source
    return r

def write_temp(txt):
    with open('temp.txt', 'w') as f:
        f.write(txt)

def forever21_single_item(obj: Item):
    html = render_page(obj.href)
    soup = BeautifulSoup(html, 'html.parser')

    color_tag_list: list = soup.find_all("button", {"swatch--color-large"})
    dirty_colors: list = [str(x.get('aria-label')) for x in color_tag_list]
    clean_colors: list = [color.removeprefix('Color: ') for color in dirty_colors]
    obj.color_list = clean_colors

    size_tag_list: list = soup.find_all("button", {"class":"swatch--size-large"})
    dirty_sizes: list = [str(x.get('aria-label')) for x in size_tag_list]
    clean_sizes: list = [size.removeprefix('Size: ') for size in dirty_sizes]
    obj.size_list = clean_sizes

def forever21(url: str, type: str):
    html = render_page(url)
    soup = BeautifulSoup(html, 'html.parser')
    products: list = soup.find_all("div", {"class":'product-grid__item'})
    #for local items it is forever21.com + path
    local_path: str = 'https://www.forever21.com'
    # write_temp(str(products[0]))
    # return
    product_objects: list = []
    for product in products:
        try:
            product = str(product)
            one_line_prod: str = product.replace('\n', '')

            item = Item()
            img: str = re.search(r'<source[^>]+srcset="([^">]+)"', product).group(1)
            item.img = img

            
            name: str = re.search(r'<p class=\"product-tile__body-section product-tile__name text-line--small letter-spacing--small body-type--centi\" itemprop=\"name\">(.*?)<\/p>', one_line_prod).group(1)
            item.name = name

            #attach the home link to the child link
            href = local_path + str(re.search(r'<a class=\"product-tile__anchor product-tile__anchor--product-info\" data-product-url=\"productShow\" href=\"(.*?)\"', product).group(1))
            item.href = href
            
            price: float = float(re.search(r'itemprop="price">(.*?)<\/span>', one_line_prod).group(1).replace('$',''))
            item.price = price

            forever21_single_item(item)

            item.type = type
            # print(item.to_dict())
        except:
            pass
            print('here')
        product_objects.append(item.to_dict())
        # break
    # print(len(product_objects))
    collections.append(product_objects)

def main():
    amt_per_page: int = 64
    forever21(f'https://www.forever21.com/us/shop/catalog/category/f21/plus-size-clothing?cgid=plus_size_clothing&prefn1=akeneo_departmentName&prefv1=department_name_plus_size&prefn2=akeneo_shopByCategoryNew&prefv2=shop_by_category_new_sweaters%7Cshop_by_category_new_tees%7Cshop_by_category_new_tops%7Cshop_by_category_new_shirts_and_blouses&sz={amt_per_page}', 'top')
    forever21(f'https://www.forever21.com/us/shop/catalog/category/f21/plus-size-clothing?cgid=plus_size_clothing&prefn1=akeneo_departmentName&prefv1=department_name_plus_size&prefn2=akeneo_shopByCategoryNew&prefv2=shop_by_category_new_bottoms%7Cshop_by_category_new_pants%7Cshop_by_category_new_shorts%7Cshop_by_category_new_skirts%7Cshop_by_category_new_jeans%7Cshop_by_category_new_leggings&sz={amt_per_page}', 'bottom')
    forever21(f'https://www.forever21.com/us/shop/catalog/category/21men/mens-new-arrivals-clothing?cgid=mens_new_arrivals_clothing&prefn1=akeneo_shopByCategoryNew&prefv1=shop_by_category_new_jackets_and_outerwear%7Cshop_by_category_new_shirts_and_blouses%7Cshop_by_category_new_tees%7Cshop_by_category_new_sweaters%7Cshop_by_category_new_tops&prefn2=akeneo_sizeName&prefv2=XXL%7CXL&sz={amt_per_page}', 'top')
    forever21(f'https://www.forever21.com/us/shop/catalog/category/21men/mens-new-arrivals-clothing?cgid=mens_new_arrivals_clothing&prefn1=akeneo_shopByCategoryNew&prefv1=shop_by_category_new_bottoms%7Cshop_by_category_new_jeans%7Cshop_by_category_new_shorts%7Cshop_by_category_new_pants&prefn2=akeneo_sizeName&prefv2=XXL%7CXL%7C2XL%7CL%2FXL&sz={amt_per_page}', 'bottom')
    mydb['clothes'].delete_many({})
    for collection in collections:
        mydb['clothes'].insert_many(list(collection))
    print('done')



if __name__ == "__main__":
    start_time = time.time()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    try:
        main()
    except:
        pass
    driver.quit()
    print(f'total time: {round(((time.time() - start_time)/60), 2)} minutes')