package school.mindera.toDoListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.UsersEntity;
import school.mindera.toDoListAPI.model.DTOLoggedUser;
import school.mindera.toDoListAPI.model.DTOLogin;
import school.mindera.toDoListAPI.model.DTORegister;
import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    private final UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public DTOLoggedUser register(DTORegister register) {
        UsersEntity newUser = new UsersEntity();
        newUser.setUsername(register.getUsername());
        newUser.setPassword(passwordEncoder.encode(register.getPassword()));
        newUser.setFirstName(register.getFirstName());
        newUser.setLastName(register.getLastName());
        newUser.setEmail(register.getEmail());

        UsersEntity savedUser = usersRepository.save(newUser);

        DTOLoggedUser loggedUser = new DTOLoggedUser();
        loggedUser.setUserId(savedUser.getUserId());
        loggedUser.setUsername(savedUser.getUsername());
        loggedUser.setFirstName(savedUser.getFirstName());
        loggedUser.setLastName(savedUser.getLastName());
        loggedUser.setEmail(savedUser.getEmail());
        loggedUser.setGroupsURL("/groups/" + savedUser.getUserId());
        loggedUser.setTasksPreviewsURL("/task-previews/" + savedUser.getUserId());

        return loggedUser;
    }

    public ResponseEntity<DTOLoggedUser> logIn(DTOLogin login) {
        Optional<UsersEntity> optionalUser = usersRepository.findByUsername(login.getUsername());

        if (optionalUser.isPresent()) {
            UsersEntity user = optionalUser.get();
            if (passwordEncoder.matches(login.getPassword(),user.getPassword())) {
                DTOLoggedUser loggedUser = new DTOLoggedUser();
                loggedUser.setUserId(user.getUserId());
                loggedUser.setUsername(user.getUsername());
                loggedUser.setFirstName(user.getFirstName());
                loggedUser.setLastName(user.getLastName());
                loggedUser.setEmail(user.getEmail());
                loggedUser.setGroupsURL("/groups/" + user.getUserId());
                loggedUser.setTasksPreviewsURL("/task-previews/" + user.getUserId());
                return ResponseEntity.ok(loggedUser);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
