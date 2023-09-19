package com.example.pma.PM.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(unique=true)
    private String title;

    @NotBlank(message = "Summary is required")
    private String summary;

    private String status="Not_Started";

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern="yyyy-MM-dd")
    @NotNull(message = "Due Date is required")
    private Date dueDate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date created_At;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date updated_At;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    Project project;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ProjectTask() {
    }

    public ProjectTask(Long id, String title, String summary, String status, Date dueDate, Date created_At, Date updated_At) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.status = status;
        this.dueDate = dueDate;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }


}
