package com.csc380.springrabbitmqproducer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.LinkedHashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomItem {
    String img;
    String name;
    String href;
    double price;
    String type;
    ArrayList<String> size_list;
    ArrayList<String> color_list;

    public CustomItem(LinkedHashMap linkedHashMap) {
        img = (String) linkedHashMap.get("img");
        name = (String) linkedHashMap.get("name");
        href = (String) linkedHashMap.get("href");
        price = (double) linkedHashMap.get("price");
        type = (String) linkedHashMap.get("type");
        size_list = (ArrayList<String>) linkedHashMap.get("size_list");
        color_list = (ArrayList<String>) linkedHashMap.get("color_list");
    }
}
