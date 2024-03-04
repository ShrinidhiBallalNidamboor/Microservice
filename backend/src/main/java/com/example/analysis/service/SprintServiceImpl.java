package com.example.analysis.service;

import com.example.analysis.entity.Sprint;
import com.example.analysis.error.SprintNotFoundException;
import com.example.analysis.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SprintServiceImpl implements SprintService{

    @Autowired
    private SprintRepository sprintRepository;

    @Override
    public Sprint saveSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    @Override
    public List<Sprint> fetchSprintList() {
        return (List<Sprint>) sprintRepository.findAll();
    }

//    @Override
//    public Sprint fetchSprintById(Long sprintId) throws SprintNotFoundException {
//        Optional<Sprint> sprint = sprintRepository.findById(sprintId);
//
//        if(!sprint.isPresent()){
//            throw new SprintNotFoundException("Sprint not found");
//        }
//
//        return sprint.get();
//    }

//    @Override
//    public void deleteSprintById(Long sprintId) {
//        sprintRepository.deleteById(sprintId);
//    }

//    @Override
//    public Sprint updateSprintById(Long sprintId, Sprint sprint) {
//
//        Sprint sprintDB = sprintRepository.findById(sprintId).get();
//
//        if(Objects.nonNull(sprint.getProjectID())){
//            sprintDB.setProjectID(sprint.getProjectID());
//        }
//
//        if(Objects.nonNull(sprint.getSprintName())){
//            sprintDB.setSprintName(sprint.getSprintName());
//        }
//
//        if(Objects.nonNull(sprint.getStartTime())){
//            sprintDB.setStartTime(sprint.getStartTime());
//        }
//
//        if(Objects.nonNull(sprint.getEndTime())){
//            sprintDB.setEndTime(sprint.getEndTime());
//        }
//
//        return sprintRepository.save(sprintDB);
//
//    }

    @Override
    public Sprint fetchSprintByProjectId(Long projectId) {
        return sprintRepository.findByProjectId(projectId);
    }

}
