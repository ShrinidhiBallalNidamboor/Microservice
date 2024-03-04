package com.example.analysis.service;

import com.example.analysis.entity.Issue;
import com.example.analysis.entity.Sprint;
import com.example.analysis.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueServiceImpl implements IssueService{


    @Autowired
    private IssueRepository issueRepository; // Assuming you have an IssueRepository

    @Override
    public Issue saveIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    @Override
    public List<Issue> fetchIssueList() {
        return (List<Issue>) issueRepository.findAll();
    }

    @Override
    public List<Issue> getIssuesBySprintId(Long sprintId) {
        return issueRepository.findBySprintId(sprintId);
    }
}
