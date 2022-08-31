package com.csc380.springrabbitmqproducer;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import net.minidev.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;


@RestController
public class MessagePublisher {

    @Autowired
    private RabbitTemplate template;

    @PostMapping("/publish")
    public ResponseEntity publishMessage(@RequestBody ArrayList<JSONObject> jsonObjects) throws UnsupportedEncodingException {

        double total = (double) jsonObjects.get(jsonObjects.size()-2).get("total");
        String username = (String) jsonObjects.get(jsonObjects.size()-1).get("username");
        String email = (String) jsonObjects.get(jsonObjects.size()-1).get("email");
        String token = (String) jsonObjects.get(jsonObjects.size()-1).get("token");
        System.out.println("OK");

        if (username == null || email == null || token == null) {
            return ResponseEntity.badRequest().body("Information missing");
        }
        else {
            boolean realUser = verify(username, token);
            if (realUser) {
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

                for (int i = 0; i < jsonObjects.size() - 2; i++) {
//                    CustomItem customItem = new CustomItem((LinkedHashMap) items.get(i));
                    JSONObject customItem = jsonObjects.get(i);

                    StringBuilder sb = new StringBuilder();
                    sb.append("<tr><td>");
                    sb.append(customItem.get("name"));
                    sb.append("</td><td>");
                    sb.append(customItem.get("price"));
                    sb.append("</td><td>");
                    sb.append(customItem.get("type"));
                    sb.append("</td><td>");
                    for (String size : (ArrayList<String>) customItem.get("size_list")) {
                        sb.append(size);
                        sb.append("<br>");
                    }
                    sb.append("</td><td>");
                    for (String color : (ArrayList<String>) customItem.get("color_list")) {
                        sb.append(color);
                        sb.append("<br>");
                    }
                    sb.append("</td><td><img src=\"");
                    sb.append(customItem.get("img"));
                    sb.append("\" alt=\"");
                    sb.append(customItem.get("name"));
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
                return ResponseEntity.ok("Message Published");
            } else
                return ResponseEntity.badRequest().body("User could not be verified");

        }
    }

    public boolean verify(String username, String token) {
//        String token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlcm5hbWUiLCJleHAiOjE2NjE0NzI5ODF9.bIB59_qj_O1YXY3ltH3D6ew5SXny5CW1LtWaZ99md_uh8Iro94vrjGzahhlZxWdvx0gNHKEDD2VJNd_L6XD58w";

        String[] chunks = token.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        return payload.contains(username);

    }
}
