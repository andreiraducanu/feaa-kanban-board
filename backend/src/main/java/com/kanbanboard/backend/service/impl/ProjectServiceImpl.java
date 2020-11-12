package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.ProjectCreationDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.ProjectRepository;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.service.ColumnService;
import com.kanbanboard.backend.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ModelMapper modelMapper;

    private final ProjectRepository projectRepository;

    private final ColumnService columnService;

    // FIXME
    private final UserRepository userRepository;

    @Autowired
    ProjectServiceImpl(ModelMapper modelMapper, ProjectRepository projectRepository, ColumnService columnService, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.projectRepository = projectRepository;
        this.columnService = columnService;
        this.userRepository = userRepository;
    }

    @Override
    public Project create(ProjectCreationDto projectDto) {
        // FIXME: Get owner
        User owner = userRepository.findByUsername("test");
        userRepository.save(owner);

        // Convert DTO to model
        Project project = modelMapper.map(projectDto, Project.class);

        // Set the owner
        project.setOwner(owner);

        // Add default columns
        project.addColumn(columnService.createColumn("Backlog"));
        project.addColumn(columnService.createColumn("To Do"));
        project.addColumn(columnService.createColumn("In Progress"));
        project.addColumn(columnService.createColumn("Done"));

        return saveOrUpdate(project);
    }

    @Override
    public Project updateById(String id, ProjectUpdateDto projectDto) {
        Project project = getById(id);

        if (project == null)
            return null;

        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());

        return saveOrUpdate(project);
    }

    @Override
    public void deleteById(String id) {
        projectRepository.deleteById(id);
    }

    @Override
    public Project getById(String id) {
        return projectRepository.findById(id).orElse(null);
    }

    private Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }
}
