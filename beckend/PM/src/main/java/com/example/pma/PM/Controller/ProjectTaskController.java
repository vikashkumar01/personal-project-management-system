package com.example.pma.PM.Controller;

import com.example.pma.PM.Model.ProjectTask;
import com.example.pma.PM.Services.MapValidationErrorService;
import com.example.pma.PM.Services.ProjectTaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1")
public class ProjectTaskController {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;



    @PostMapping("/{projectId}/projectTask/create-task")
    public ResponseEntity<?> createTask(@Valid @PathVariable Long projectId,
                                                        @RequestBody ProjectTask projecttask,
                                                        BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        projectTaskService.createProjectTask(projectId,projecttask);

        return new ResponseEntity<String>("projectTask Created Successfully", HttpStatus.CREATED);
    }


    @DeleteMapping("/projectTask/{projectTaskId}")
    public ResponseEntity<String> deleteProjectTaskById(@PathVariable Long projectTaskId){
        projectTaskService.deleteProjectTaskById(projectTaskId);
        return new ResponseEntity<String>("Project deleted Successfully",HttpStatus.OK);

    }

    @GetMapping("/projectTask/{projectTaskId}/update")
    public ResponseEntity<String> updateProjectTask(@PathVariable Long projectTaskId){
        String uTask = projectTaskService.updateProjectTaskById(projectTaskId);
        return new ResponseEntity<String>(uTask,HttpStatus.OK);
    }
}
