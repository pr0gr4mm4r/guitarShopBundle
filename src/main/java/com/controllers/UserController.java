package com.controllers;

import com.entities.User;
import com.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@CrossOrigin
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/addUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    User saveUser(@RequestBody Object[] userInfoObjects) {
        return userService.addUser(userInfoObjects);
    }

    @GetMapping(value = "/login")
    public @ResponseBody
    Principal login(@AuthenticationPrincipal Principal principal) {
        return principal;
    }

    @GetMapping("/addUser")
    public @ResponseBody
    String addNewUser() {
        return "<p>success<p>";
    }

    @GetMapping("/userRolesByEmail/{email}")
    public @ResponseBody
    List<String> userRolesByEmail(@PathVariable(value = "email") String email) {
        return this.userService.receiveUserRolesByEmail(email);
    }

    @GetMapping(value = "/checkIfEmailPersisted/{email}")
    public @ResponseBody boolean checkIfEmailPersisted(@PathVariable(value = "email") String email) {
        return this.userService.checkIfEmailPersisted(email);
    }

    @GetMapping(value = "/checkIfNamePersisted/{name}")
    public @ResponseBody boolean checkIfNamePersisted(@PathVariable(value = "name") String name) {
        return this.userService.checkIfNamePersisted(name);
    }
}
