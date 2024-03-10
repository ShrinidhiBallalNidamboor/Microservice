package com.example.analysis.service;

import com.example.analysis.entity.Sprint;
import com.example.analysis.error.SprintNotFoundException;
import com.example.analysis.helperClasses.SprintStats;

import java.util.List;

public interface SprintService {
    public Sprint saveSprint(Sprint sprint);

    public List<Sprint> fetchSprintList();

//    public Sprint fetchSprintById(Long sprintId) throws SprintNotFoundException;
//
//    public void deleteSprintById(Long sprintId);
//
//    public Sprint updateSprintById(Long sprintId, Sprint sprint);

    public Sprint fetchSprintByProjectId(Long projectId);

    public SprintStats calculateSprintStats(Long sprintId);
}
