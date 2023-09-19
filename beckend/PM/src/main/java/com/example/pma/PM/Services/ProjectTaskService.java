package com.example.pma.PM.Services;

import com.example.pma.PM.Exception.ProjectIdException;
import com.example.pma.PM.Exception.ProjectTaskAlreadyExist;
import com.example.pma.PM.Exception.ProjectTaskIdException;
import com.example.pma.PM.Model.Project;
import com.example.pma.PM.Model.ProjectTask;
import com.example.pma.PM.Repository.ProjectRepository;
import com.example.pma.PM.Repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;


@Service
public class ProjectTaskService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask createProjectTask(Long projectId, ProjectTask projecttask) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectIdException("Project Id " + projectId + " does not Exists"));

        ProjectTask ptask = null;
        try {
            ptask = projectTaskRepository.save(projecttask);
        } catch (DataIntegrityViolationException e) {
            throw new ProjectTaskAlreadyExist("ProjectTask already Exist");
        }

        ptask.setProject(project);
        project.getProjectTaskList().add(ptask);

        projectRepository.save(project);

        return ptask;
    }

    public void deleteProjectTaskById(Long projectTaskId) {

        ProjectTask projectTask = projectTaskRepository.findById(projectTaskId)
                .orElseThrow(() -> new ProjectTaskIdException("Project with Id " + projectTaskId + " not found"));

        projectTaskRepository.deleteById(projectTaskId);
    }

    public String updateProjectTaskById(Long projectTaskId) {
        ProjectTask pTask = projectTaskRepository.findById(projectTaskId)
                .orElseThrow(() -> new ProjectTaskIdException("Project with Id " + projectTaskId + " not found"));

        String pTaskS = "";

        if (pTask.getStatus().equals("On_Going")) {
            pTask.setStatus("Completed");
            pTaskS = "Project Task is Completed";
        }

        if (pTask.getStatus().equals("Not_Started")) {
            pTask.setStatus("On_Going");
            pTaskS = "Project Task is Started";
        }

        projectTaskRepository.save(pTask);

        return pTaskS;

    }
}
