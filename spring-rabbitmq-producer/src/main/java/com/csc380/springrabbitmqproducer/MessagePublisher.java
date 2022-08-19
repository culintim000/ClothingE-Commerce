package com.csc380.springrabbitmqproducer;

import net.minidev.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;


@RestController
public class MessagePublisher {

    @Autowired
    private RabbitTemplate template;

    @PostMapping("/publish")
    public String publishMessage(@RequestBody JSONObject jsonObject){

        System.out.println(jsonObject.toString());

        double total = (double) jsonObject.get("total");
        Object customerInfo = jsonObject.get("customerInfo");
        LinkedHashMap hashMapCusInfo = (LinkedHashMap) customerInfo;
        String username = (String) hashMapCusInfo.get("username");
        String email = (String) hashMapCusInfo.get("email");

        ArrayList items = (ArrayList) jsonObject.get("items");

        StringBuilder mainSB = new StringBuilder();
        mainSB.append("<h2>Thank you for using our services ");
        mainSB.append(username);
        mainSB.append("!</h2><h3>Bellow is your order summary </h3>" +
                "<table border=\"2\">" +
                "    <tr>" +
                "        <th>Name</th>" +
                "        <th>Price</th>" +
                "        <th>Type</th>" +
                "        <th>Available Sizes</th>" +
                "        <th>Available Colors</th>" +
                "        <th>Image</th>" +
                "    </tr>");

        for (int i = 0; i < items.size(); i++) {
            CustomItem customItem = new CustomItem((LinkedHashMap) items.get(i));

            StringBuilder sb = new StringBuilder();
            sb.append("<tr><td>");
            sb.append(customItem.name);
            sb.append("</td><td>");
            sb.append(customItem.price);
            sb.append("</td><td>");
            sb.append(customItem.type);
            sb.append("</td><td>");
            for (String size : customItem.size_list) {
                sb.append(size);
                sb.append("<br>");
            }
            sb.append("</td><td>");
            for (String color : customItem.color_list) {
                sb.append(color);
                sb.append("<br>");
            }
            sb.append("</td><td><img src=\"");
            sb.append(customItem.img);
            sb.append("\" alt=\"");
            sb.append(customItem.name);
            sb.append("\" style=\"width:90px;height:120px;\"></td></tr>");
            mainSB.append(sb.toString());
        }
        mainSB.append("</table><h4>The total for your order is: ");
        mainSB.append(total);
        mainSB.append("</h4>");

        JSONObject output = new JSONObject();
        output.appendField("email", email);
        output.appendField("subject", "Order Summary");
        output.appendField("body", mainSB.toString());


        template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY, output);

        return "Message Published";
    }
}
