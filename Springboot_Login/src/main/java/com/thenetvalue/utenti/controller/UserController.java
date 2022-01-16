package com.thenetvalue.utenti.controller;

//import com.thenetvalue.utenti.model.Login;
import com.thenetvalue.utenti.model.Login;
import com.thenetvalue.utenti.model.LoginCredentials;
import com.thenetvalue.utenti.model.User;
import com.thenetvalue.utenti.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/utenti")   //porzione di radice uguale a tutti

public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<String> addUser(@RequestBody User user){  //RequestBody=tutto cio che mi passa dall'esterno va messo nell oggetto users
        if (userService.addUser(user) == "Utente salvato correttamente") {
            return ResponseEntity.ok().body("Utente salvato correttamente");
        }
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*")
    public User getUserById(@PathVariable("id") int id){    //PathVariable=Associare l'id del GetMapping all'id del nostro utente
        return userService.getUser(id);
    }
    @RequestMapping(value = "/login", method=RequestMethod.POST)
    @CrossOrigin(origins = "*")
    public Login login(@RequestBody LoginCredentials loginSend){    //Cerca l'utente tramite l'username
        return userService.login(loginSend);
    }
    @RequestMapping(value = "/username/{username}", method=RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public User getUserByUsername(@PathVariable("username") String username){    //Cerca l'utente tramite l'username
        return userService.getUserByUsername(username);
    }
    
    @GetMapping("/username/like/{partialUsername}")
    public List<User> findAllByUsernameContaining(@PathVariable("partialUsername") String partialUsername){
        return userService.findAllByUsernameContaining(partialUsername);
    }

    @GetMapping("/")
    @CrossOrigin(origins = "*")
    public Iterable<User> allUsers(){
        return userService.allUsers();
    }
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") int id, @RequestBody User user){
        return userService.updateUser(id,user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id")int id){
        return userService.deleteUser(id);
    }
}
