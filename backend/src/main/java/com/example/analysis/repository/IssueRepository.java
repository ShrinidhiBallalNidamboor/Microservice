package com.example.analysis.repository;

import com.example.analysis.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    // Specify the property name in the Issue entity
    List<Issue> findBySprintId(Long sprintId);
}