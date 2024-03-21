package com.example.analysis.entity;

import jakarta.persistence.Entity;

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
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "sprint_id", nullable = false)
//    private Sprint sprint;

//    @ManyToOne
//    @JoinColumn(name = "sprint_id")
//    private Sprint sprint;

    @Column(name = "sprint_id", nullable = false)
    private Long sprintId;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @Column(name = "owner_id", nullable = false, length = 50)
    private String ownerId;

    @Column(name = "owner_name", nullable = false, length = 20)
    private String ownerName;

    @Column(name = "points", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int points;

}

