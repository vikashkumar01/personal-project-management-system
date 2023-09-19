package com.example.pma.PM.Repository;

import com.example.pma.PM.Model.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask,Long> {
}
