package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.ProjectAddMemberDto;
import com.kanbanboard.backend.dto.ProjectCreationDto;
import com.kanbanboard.backend.dto.ProjectDto;
import com.kanbanboard.backend.dto.ProjectUpdateDto;
import com.kanbanboard.backend.model.Column;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.ColumnRepository;
import com.kanbanboard.backend.repository.ProjectRepository;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.service.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ModelMapper modelMapper;

    private final ProjectRepository projectRepository;
    private final ColumnRepository columnRepository;
    private final UserRepository userRepository;

    @Autowired
    ProjectServiceImpl(ModelMapper modelMapper, ProjectRepository projectRepository, ColumnRepository columnRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;

        this.projectRepository = projectRepository;
        this.columnRepository = columnRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProjectDto create(ProjectCreationDto projectDto, String username) {
        // Get owner
        User owner = userRepository.findByUsername(username);

        // Convert DTO to model
        Project project = modelMapper.map(projectDto, Project.class);

        // Set the owner
        project.setOwner(owner);

        // Add default columns
        project.addColumn(createColumn("Backlog"));
        project.addColumn(createColumn("To Do"));
        project.addColumn(createColumn("In Progress"));
        project.addColumn(createColumn("Done"));

        // Save the project
        project = saveOrUpdate(project);

        return convertToDto(project);
    }

    @Override
    public List<ProjectDto> getAll(String ownerFilter) {
        List<Project> projects;

        User owner = null;
        if (ownerFilter != null) {
            // Get the owner
            owner = userRepository.findByUsername(ownerFilter);

            // Filter projects
            projects = projectRepository.findByOwner(owner);
        } else {
            projects = projectRepository.findAll();
        }

        // Always return a empty list
        if (projects == null)
            projects = new ArrayList<>();

        return convertToDto(projects);
    }

    @Override
    public ProjectDto getById(String id) {
        // TODO: Add exception
        Project project = findById(id);
        if (project == null)
            return null;

        return convertToDto(project);
    }

    @Override
    public ProjectDto updateById(String id, ProjectUpdateDto projectDto) {
        // TODO: Add exception
        Project project = findById(id);
        if (project == null)
            return null;

        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());

        // Update the project
        project = saveOrUpdate(project);

        return convertToDto(project);
    }

    @Override
    public void deleteById(String id) {
        projectRepository.deleteById(id);
    }

    @Override
    public ProjectDto addMember(String id, ProjectAddMemberDto projectMemberDto) {
        // TODO: Add exception
        // Get the project
        Project project = findById(id);
        if (project == null)
            return null;

        // TODO: Add exception
        // Get the member
        User member = userRepository.findByUsername(projectMemberDto.getMemberUsername());
        if (member == null)
            return null;

        // Add the member to project
        project.addMember(member);

        // Update the project
        project = saveOrUpdate(project);

        return convertToDto(project);
    }

    private Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }

    private Project findById(String id) {
        return projectRepository.findById(id).orElse(null);
    }

    private ProjectDto convertToDto(Project project) {
        return modelMapper.map(project, ProjectDto.class);
    }

    private List<ProjectDto> convertToDto(List<Project> projects) {
        return projects.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private Column createColumn(String name) {
        return columnRepository.save(new Column(name));
    }
}
