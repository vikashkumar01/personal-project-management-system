package com.example.pma.PM.Repository;

import com.example.pma.PM.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

}
