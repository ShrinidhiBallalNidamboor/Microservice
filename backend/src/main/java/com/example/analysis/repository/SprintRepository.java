package com.example.analysis.repository;

import com.example.analysis.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource
public interface SprintRepository extends CrudRepository<Sprint, Long> {


    public Sprint findByProjectId(Long projectID);

}
