package school.mindera.toDoListAPI.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.entities.UsersEntity;

import school.mindera.toDoListAPI.repositories.UsersRepository;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {
    private final UsersRepository usersRepository;

    public AuthenticationService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UsersEntity> user = usersRepository.findByUsername(username);
        if (user.isEmpty()){
            throw new UsernameNotFoundException("User not found");
        }
        return new User(user.get().getUsername(),user.get().getPassword(), Collections.singleton(new SimpleGrantedAuthority("USER")));
    }
}
