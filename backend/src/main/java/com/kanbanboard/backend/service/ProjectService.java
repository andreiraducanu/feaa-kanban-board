package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.ProjectAddMemberDto;
import com.kanbanboard.backend.dto.ProjectCreateDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;

import java.util.List;

public interface ProjectService {

    ProjectDto create(ProjectCreateDto projectCreateDto);

    List<ProjectDto> getAll(String ownerFilter);

    ProjectDto getById(String idProject);

    ProjectDto updateById(String idProject, ProjectUpdateDto projectUpdateDto);

    String deleteById(String idProject);

    ProjectDto addMember(String idProject, ProjectAddMemberDto projectAddMemberDto);
}
