from bs4 import BeautifulSoup
from selenium import webdriver
import time
from webdriver_manager.chrome import ChromeDriverManager
import re

class Item:
    def __init__(self) -> None:
        self.img: str = None
        self.name: str = None
        self.href: str = None
        self.price: float = None
        size_list: list = []
    def to_dict(self) -> dict:
        return (self.__dict__)

def render_page(url):
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(url)
    time.sleep(3)
    r = driver.page_source
    #driver.quit()
    return r

def write_temp(txt):
    with open('temp.txt', 'w') as f:
        f.write(txt)


def forever21():
    url: str = r'https://www.forever21.com/us/shop/catalog/category/plus/plus-size-new-arrivals?cgid=plus_size_new_arrivals&sz=64'
    html = render_page(url)
    soup = BeautifulSoup(html, 'html.parser')
    products: list = soup.find_all("div", {"class":'product-grid__item'})
    #for local items it is forever21.com + path
    local_path: str = 'forever21.com'
    print(len(products))
    # write_temp(str(products[0]))
    # return
    product_objects: list = []
    for product in products:
    # try:
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



        print(item.to_dict())
        product_objects.append(item)
    # except:
        # pass
        break

def main():
    forever21()




if __name__ == "__main__":
    main()