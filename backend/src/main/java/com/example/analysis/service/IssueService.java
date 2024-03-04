package com.example.analysis.service;

import com.example.analysis.entity.Issue;
import com.example.analysis.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

public interface IssueService {


    public Issue saveIssue(Issue issue);

    public List<Issue> fetchIssueList();

    public List<Issue> getIssuesBySprintId(Long sprintId);

}
