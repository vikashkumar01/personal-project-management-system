package com.example.pma.PM.Services;

import com.example.pma.PM.Exception.ProjectAlreadyExist;
import com.example.pma.PM.Exception.ProjectIdException;
import com.example.pma.PM.Model.Project;
import com.example.pma.PM.Model.User;
import com.example.pma.PM.Repository.ProjectRepository;
import com.example.pma.PM.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public Project save(Project project) {
        Project createdProject;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email = null;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }


        User user = userRepository.findByEmail(email);
        project.setUser(user);
        try {
            createdProject = projectRepository.save(project);
        } catch (DataIntegrityViolationException e) {
            throw new ProjectAlreadyExist("Project already Exists");
        }
        user.getProjectList().add(createdProject);
        userRepository.save(user);
        return createdProject;
    }

    public Optional<Project> findProjectById(Long projectId) {

        Optional<Project> project = projectRepository.findById(projectId);

        if (project.isEmpty()) {
            throw new ProjectIdException("Project Id " + projectId + " does not Exists");
        }

        return project;
    }


    public void deleteProjectById(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectIdException("Project Id " + projectId + " does not Exists"));

        projectRepository.deleteById(projectId);

    }


    public String updateProject(Long projectId, Project project) {

        Project updateProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectIdException("Project Id " + projectId + " does not Exists"));

        updateProject.setProjectName(project.getProjectName());
        updateProject.setDescription(project.getDescription());
        updateProject.setStartDate(project.getStartDate());
        updateProject.setEndDate(project.getEndDate());

        projectRepository.save(updateProject);

        return "project updated succesfully";
    }
}
