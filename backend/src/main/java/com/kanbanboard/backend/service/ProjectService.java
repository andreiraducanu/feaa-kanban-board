package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.ProjectCreationDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;

import java.util.List;

public interface ProjectService {

    ProjectDto create(ProjectCreationDto projectDto, String username);

    List<ProjectDto> getAll(String ownerFilter);

    ProjectDto getById(String id);

    ProjectDto updateById(String id, ProjectUpdateDto projectDto);

    void deleteById(String id);

    ProjectDto addMember(String id, ProjectAddMemberDto projectMemberDto);
}
