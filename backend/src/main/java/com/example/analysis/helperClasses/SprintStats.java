package com.example.analysis.helperClasses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SprintStats {

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private int duration;
    private int totalPoints;
    private int donePoints;
    private List<Integer> taskStatusCounts;  // Added for chart data
    private Map<String, MemberStats> memberStatsMap;  // Added for member-wise points
}

