from bs4 import BeautifulSoup
from selenium import webdriver
import time
from webdriver_manager.chrome import ChromeDriverManager
import re

class Item:
    def __init__(self) -> None:
        self.img = None
    def to_dict(self) -> dict:
        return (self.__dict__)

class Shirt(Item):
    pass

def render_page(url):
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(url)
    time.sleep(3)
    r = driver.page_source
    #driver.quit()
    return r




def forever21():
    url: str = r'https://www.forever21.com/us/shop/catalog/category/plus/plus-size-new-arrivals?cgid=plus_size_new_arrivals&sz=64'
    html = render_page(url)
    soup = BeautifulSoup(html, 'html.parser')
    products: list = soup.find_all("div", {"class":'product-grid__item'})
    #for local items it is forever21.com + path
    print(len(products))
    # print(products[0])
    product_objects: list = []
    for product in products:
        img = re.search(r'<source[^>]+srcset="([^">]+)"', str(product)).group(1)
        print(img)
        test = Item()
        test.img = img
        break

def main():
    forever21()




if __name__ == "__main__":
    main()