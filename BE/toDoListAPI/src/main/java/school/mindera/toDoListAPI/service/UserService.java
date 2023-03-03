package school.mindera.toDoListAPI.service;

import org.springframework.stereotype.Service;
import school.mindera.toDoListAPI.repository.UserRepository;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

}
