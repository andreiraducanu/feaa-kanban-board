package com.kanbanboard.backend.service;

import com.kanbanboard.backend.dto.ProjectCreationDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.model.Project;

public interface ProjectService {

    Project create(ProjectCreationDto projectDto);

    Project updateById(String id, ProjectUpdateDto projectDto);

    void deleteById(String id);

    Project getById(String id);
}
