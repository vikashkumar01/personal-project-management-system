package com.example.pma.PM.Services;

import com.example.pma.PM.Exception.EmailAlreadyExist;
import com.example.pma.PM.Exception.UserIdException;
import com.example.pma.PM.Model.User;
import com.example.pma.PM.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        User cuser=null;
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            cuser = userRepository.save(user);
        }catch(Exception ex){
            throw new EmailAlreadyExist("Email Already Exist");
        }

        return cuser;
    }

    public void deleteUser(Long userId ){

         userRepository.findById(userId).
                orElseThrow(()-> new UserIdException("User not found with " + userId ));

        userRepository.deleteById(userId);
    }
}
