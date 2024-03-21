package com.example.analysis.service;

import com.example.analysis.entity.Issue;
import com.example.analysis.entity.Sprint;
import com.example.analysis.error.SprintNotFoundException;
import com.example.analysis.helperClasses.MemberStats;
import com.example.analysis.helperClasses.SprintStats;
import com.example.analysis.repository.IssueRepository;
import com.example.analysis.repository.SprintRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class SprintServiceImpl implements SprintService{

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private IssueRepository issueRepository;

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


    @Override
    public SprintStats calculateSprintStats(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new EntityNotFoundException("Sprint not found with id: " + sprintId));

        List<Issue> issues = issueRepository.findBySprintId(sprintId);
        System.out.println(issues.size());
        SprintStats sprintStats = new SprintStats();
        sprintStats.setStartDate(sprint.getStartDate());
        sprintStats.setEndDate(sprint.getEndDate());
        sprintStats.setStatus(sprint.getStatus());
        sprintStats.setDuration(sprint.getDuration());

        int totalPoints = 0;
        int donePoints = 0;

        // Initialize task status counts
        int todoCount = 0;
        int inProgressCount = 0;
        int blockedCount = 0;
        int doneCount = 0;

        Map<String, MemberStats> memberStatsMap = new HashMap<>();

        int[] issuesByAgeRange = new int[4];

        LocalDateTime currentDate = LocalDateTime.now();

        for (Issue issue : issues) {

            if ("IN_PROGRESS".equals(issue.getStatus()) || "TODO".equals(issue.getStatus())) {

                LocalDateTime startDate = issue.getStartDate();

                // Calculate the age in days
                long ageInDays = ChronoUnit.DAYS.between(startDate, currentDate);

                // Categorize tasks based on age
                if (ageInDays >= 0 && ageInDays <= 10) {
                    issuesByAgeRange[0]++;
                } else if (ageInDays > 10 && ageInDays <= 20) {
                    issuesByAgeRange[1]++;
                } else if (ageInDays > 20 && ageInDays <= 30) {
                    issuesByAgeRange[2]++;
                } else {
                    issuesByAgeRange[3]++;
                }
            }



            totalPoints += issue.getPoints();
            if ("DONE".equals(issue.getStatus())) {
                donePoints += issue.getPoints();
                doneCount++;
            } else if ("TODO".equals(issue.getStatus())) {
                todoCount++;
            } else if ("IN_PROGRESS".equals(issue.getStatus())) {
                inProgressCount++;
            } else if ("BLOCKED".equals(issue.getStatus())) {
                blockedCount++;
            }

            // Update member-wise points
            String ownerName = issue.getOwnerName();
            MemberStats memberStats = memberStatsMap.getOrDefault(ownerName, new MemberStats());
            memberStats.setTotalPoints(memberStats.getTotalPoints() + issue.getPoints());
            if ("DONE".equals(issue.getStatus())) {
                memberStats.setDonePoints(memberStats.getDonePoints() + issue.getPoints());
            }
            memberStatsMap.put(ownerName, memberStats);
        }

        // Set counts in SprintStats for chart data
        sprintStats.setTotalPoints(totalPoints);
        sprintStats.setDonePoints(donePoints);
        sprintStats.setTaskStatusCounts(Arrays.asList(todoCount, inProgressCount, blockedCount, doneCount));
        sprintStats.setMemberStatsMap(memberStatsMap);
        sprintStats.setIssuesByAgeRange(issuesByAgeRange);



        return sprintStats;
    }

}
