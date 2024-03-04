package com.example.analysis.controller;

import com.example.analysis.entity.Issue;
import com.example.analysis.entity.Sprint;
import com.example.analysis.service.IssueService;
import com.example.analysis.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {

    @Autowired
    private IssueService issueService;


    @PostMapping("/issues")
    public Issue saveIssue(@RequestBody Issue issue){
        return issueService.saveIssue(issue);
    }

    @GetMapping("/issues")
    public List<Issue> fetchIssueList(){
        return issueService.fetchIssueList();
    }

    @GetMapping("/issues/sprintid/{id}")
    public List<Issue> fetchBySprintId(@PathVariable("id") Long sprintId){

        return issueService.getIssuesBySprintId(sprintId);
    }
}
