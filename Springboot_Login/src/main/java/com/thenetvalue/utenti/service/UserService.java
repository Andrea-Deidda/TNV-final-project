package com.thenetvalue.utenti.service;

import com.thenetvalue.utenti.dao.UserRepositoryDAO;
import com.thenetvalue.utenti.model.Login;
import com.thenetvalue.utenti.model.LoginCredentials;
import com.thenetvalue.utenti.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    UserRepositoryDAO userDAO;    //interfaccia user

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    //Aggiunge utente
    public String addUser(User user) {
        boolean registered = false;

        if(userDAO.findByUsername(user.getUsername()) == null ){

            boolean contains1 = user.getEmail().contains("@");
            boolean contains2 = user.getEmail().contains(".");


            if(contains1 && contains2){
                String encodedPassword = this.passwordEncoder.encode(user.getPassword()); //test crypt password
                user.setPassword(encodedPassword);
                userDAO.save(user);
                registered = true;
            }else{
                return "Email non valida";
            }
        }else{
            User userFound = new User();
            userFound = userDAO.findByUsername(user.getUsername());

            boolean equalsUsername = Objects.equals(userFound.getUsername(), user.getUsername());
            boolean equalsEmail = Objects.equals(userFound.getEmail(), user.getEmail());

            if (equalsUsername && !equalsEmail) {
                return "Username già utilizzato";
            } else if (equalsEmail && !equalsUsername) {
                return "Email già utilizzata";
            } else if(equalsUsername && equalsEmail){
                return "Email e Username già utilizzati";
            }
        }
        if(registered){
            return "Utente salvato correttamente";
        }else{
            return "Utente non registrato";
        }
    }
    // Prende l'utente con l'id passato
    public User getUser(int id){
        Optional<User> optionalUser = userDAO.findById(id);
        return optionalUser.orElse(null); //optionalUser.get || se l'oggetto non è nullo lo retituisce altrimenti restituisci null
    }

    //Prende tutti gli users
    public Iterable<User> allUsers() {
        return userDAO.findAll();   //restituisce un iterable
    }

    //Aggiorna l'utente con l'id passato
    public String updateUser(int id, User user) {
        user.setId(id);
        User result= userDAO.save(user);
        if (result!=null && result.getId() != 0){
            return "Utente aggiornato correttamente";
        }else{
            return "Errore nell'aggiornamento dell'utente";
        }
    }

    //Cancella l'utente con l'id passato
    public String deleteUser(int id) {
        User userRecuperato = userDAO.findById(id).orElse(null);
        if (userRecuperato==null){
            return "Utente non trovato";
        }else {
            userDAO.deleteById(id);         //cancella utente
            return "Utente eliminato correttamente";
        }
    }

    //Visualizza l'utente con lo username passato
    public Login login(LoginCredentials loginCredentials) {
        User userFound = userDAO.findByUsername(loginCredentials.getUsername());
        if (userFound.getUsername() != null) {
            BCryptPasswordEncoder b = new BCryptPasswordEncoder();
            Boolean matches = b.matches(loginCredentials.getPassword(),userFound.getPassword() );
            return new Login(userFound.getUsername(), matches, true);
        }
        else {
            return new Login(" ", false, false);
        }
    }
        public User getUserByUsername(String username) {
        return userDAO.findByUsername(username);
    }

    //Visualizza l'utente con lo username parziale passato
    public List<User> findAllByUsernameContaining(String partialUsername) {
        return userDAO.findAllByUsernameContaining(partialUsername);
    }

}
