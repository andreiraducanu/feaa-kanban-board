package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.ProjectAddMemberDto;
import com.kanbanboard.backend.dto.ProjectCreateDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;

import java.util.List;

public interface ProjectService {

    ProjectDto create(ProjectCreateDto projectCreateDto) throws EntityNotFoundException;

    List<ProjectDto> getAll(String ownerFilter) throws EntityNotFoundException;

    ProjectDto getById(String idProject) throws EntityNotFoundException;

    ProjectDto updateById(String idProject, ProjectUpdateDto projectUpdateDto) throws EntityNotFoundException;

    String deleteById(String idProject) throws EntityNotFoundException;

    ProjectDto addMember(String idProject, ProjectAddMemberDto projectAddMemberDto) throws EntityNotFoundException, ServerException;
}
