package com.example.pma.PM.Controller;


import com.example.pma.PM.Model.Project;
import com.example.pma.PM.Services.MapValidationErrorService;
import com.example.pma.PM.Services.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/project/create")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        projectService.save(project);

        return new ResponseEntity<String>("Project created successfully", HttpStatus.CREATED);

    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable Long projectId){

        Optional<Project> project = projectService.findProjectById(projectId);

        return new ResponseEntity<Optional<Project>>(project,HttpStatus.OK);
    }

    @PutMapping("/project/{projectId}")
    public ResponseEntity<String> updateProjectById(@PathVariable Long projectId,@RequestBody Project project){

        String up = projectService.updateProject(projectId, project);

        return new ResponseEntity<String>(up,HttpStatus.OK);
    }

    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable Long projectId){
        projectService.deleteProjectById(projectId);

        return new ResponseEntity<String>("Project with Id "+ projectId +" has been deleted",HttpStatus.OK);
    }

}
