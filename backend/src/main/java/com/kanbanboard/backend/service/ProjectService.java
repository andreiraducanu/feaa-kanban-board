package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
import com.kanbanboard.backend.model.Issue;

import java.util.List;

public interface ProjectService {

    ProjectItemDto create(ProjectCreateDto projectCreateDto) throws EntityNotFoundException;

    List<ProjectItemDto> getAll(String ownerFilter) throws EntityNotFoundException;

    ProjectDto getById(String idProject) throws EntityNotFoundException;

    ProjectDto updateById(String idProject, ProjectUpdateDto projectUpdateDto) throws EntityNotFoundException;

    String deleteById(String idProject) throws EntityNotFoundException;

    ProjectDto addMember(String idProject, ProjectAddMemberDto projectAddMemberDto) throws EntityNotFoundException, ServerException;

    ProjectDto moveIssue(String idProject, String idIssue, IssueMoveDto issueMoveDto) throws EntityNotFoundException;
}
