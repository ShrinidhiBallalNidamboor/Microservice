package com.example.analysis.controller;

import com.example.analysis.entity.Sprint;
import com.example.analysis.error.SprintNotFoundException;
import com.example.analysis.helperClasses.SprintStats;
import com.example.analysis.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SprintController {


    @Autowired
    private SprintService sprintService;

    @PostMapping("/sprints")
    public Sprint saveSprint(@RequestBody Sprint sprint){
        return sprintService.saveSprint(sprint);
    }

    @GetMapping("/sprints")
    public List<Sprint> fetchSprintList(){
        return sprintService.fetchSprintList();
    }

//    @GetMapping("/sprints/{id}")
//    public Sprint fetchSprintByID(@PathVariable("id") Long sprintId) throws SprintNotFoundException {
//        return sprintService.fetchSprintById(sprintId);
//    }

//    @DeleteMapping("/sprints/{id}")
//    public String deleteSprintById(@PathVariable("id") Long sprintId){
//
//        sprintService.deleteSprintById(sprintId);
//        return "Deleted successfully";
//    }

//    @PutMapping("/sprints/{id}")
//    public Sprint updateSprintById(@PathVariable("id") Long sprintId,
//                                   @RequestBody Sprint sprint){
//
//        return sprintService.updateSprintById(sprintId,sprint);
//    }

    @GetMapping("sprints/projectid/{id}")
    public Sprint fetchByProjectId(@PathVariable("id") Long projectId){

        return sprintService.fetchSprintByProjectId(projectId);
    }


    @GetMapping("/sprints/stats/{id}")
    public SprintStats getSprintStats(@PathVariable Long id) {
        return sprintService.calculateSprintStats(id);
    }


}
