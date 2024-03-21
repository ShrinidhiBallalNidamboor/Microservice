package com.example.analysis.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

//    @OneToMany(targetEntity = Issue.class, cascade = CascadeType.ALL)
//    @JoinColumn(name = "sprintid",referencedColumnName = "id")
//    private List<Issue> issues;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "status", nullable = false, length = 20)
    private String status;


}