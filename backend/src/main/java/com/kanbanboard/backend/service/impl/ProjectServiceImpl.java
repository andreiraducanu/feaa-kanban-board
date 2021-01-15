package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.dto.*;
import com.kanbanboard.backend.exception.EntityNotFoundException;
import com.kanbanboard.backend.exception.ServerException;
import com.kanbanboard.backend.model.Column;
import com.kanbanboard.backend.model.Project;
import com.kanbanboard.backend.model.User;
import com.kanbanboard.backend.repository.ColumnRepository;
import com.kanbanboard.backend.repository.IssueRepository;
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
    ProjectServiceImpl(ModelMapper modelMapper, ProjectRepository projectRepository, IssueRepository issueRepository, ColumnRepository columnRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;

        this.projectRepository = projectRepository;
        this.columnRepository = columnRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProjectItemDto create(ProjectCreateDto projectCreateDto) throws EntityNotFoundException {
        // Get owner, for testing purpose
        User owner = userRepository.findByUsername(projectCreateDto.getOwnerUsername());
        if (owner == null)
            throw new EntityNotFoundException("Owner doesn't exists");

        // Convert DTO to model
        Project project = modelMapper.map(projectCreateDto, Project.class);

        // Set the owner
        project.setOwner(owner);

        // Add default columns
        project.addColumn(createColumn("Backlog"));
        project.addColumn(createColumn("To Do"));
        project.addColumn(createColumn("In Progress"));
        project.addColumn(createColumn("Done"));

        // Save the project
        project = saveOrUpdateProject(project);

        return convertToProjectItemDto(project);
    }

    @Override
    public List<ProjectItemDto> getAll(String ownerFilter) throws EntityNotFoundException {
        List<Project> projects;

        if (ownerFilter != null) {
            // Get owner
            User owner = userRepository.findByUsername(ownerFilter);
            if (owner == null)
                throw new EntityNotFoundException("No such user");

            // Filter projects
            projects = projectRepository.findByOwner(owner);

        } else {
            projects = projectRepository.findAll();
        }

        if (projects == null) {
            return new ArrayList<>();
        }

        return convertToProjectItemDtoList(projects);
    }

    @Override
    public ProjectDto getById(String idProject) throws EntityNotFoundException {
        Project project = findProjectById(idProject);
        if (project == null)
            throw new EntityNotFoundException("No project found");

        if (project.getMembers() == null) {
            project.setMembers(new ArrayList<>());
        }

        project.getColumns().forEach(column -> {
            if (column.getIssues() == null) {
                column.setIssues(new ArrayList<>());
            }
        });

        return convertToProjectDto(project);
    }

    @Override
    public ProjectDto updateById(String idProject, ProjectUpdateDto projectUpdateDto) throws EntityNotFoundException {
        // Get the project
        Project project = findProjectById(idProject);
        if (project == null)
            throw new EntityNotFoundException("No project found");

        // Convert the DTO to model
        Project projectUpdate = modelMapper.map(projectUpdateDto, Project.class);

        // Update the project
        project.update(projectUpdate);
        project = saveOrUpdateProject(project);

        return convertToProjectDto(project);
    }

    @Override
    public String deleteById(String idProject) throws EntityNotFoundException {
        // Get the project
        Project project = findProjectById(idProject);
        if (project == null)
            throw new EntityNotFoundException("No project found");

        // Delete the project
        projectRepository.delete(project);
        System.out.println("delete");
        return "ok";
    }

    @Override
    public ProjectDto addMember(String idProject, ProjectAddMemberDto projectAddMemberDto) throws EntityNotFoundException, ServerException {
        // Get the project
        Project project = findProjectById(idProject);
        if (project == null)
            throw new EntityNotFoundException("No project found");

        // Get the member
        User member = userRepository.findByUsername(projectAddMemberDto.getMemberUsername());
        if (member == null)
            throw new EntityNotFoundException("No such user");

        // Add the member to project
        if (!project.addMember(member))
            throw new ServerException("It looks something went wrong in adding this member! Please try again later");

        // Update the project
        project = saveOrUpdateProject(project);

        if (project.getMembers() == null) {
            project.setMembers(new ArrayList<>());
        }

        project.getColumns().forEach(column -> {
            if (column.getIssues() == null) {
                column.setIssues(new ArrayList<>());
            }
        });

        return convertToProjectDto(project);
    }

    private Project saveOrUpdateProject(Project project) {
        return projectRepository.save(project);
    }

    private Project findProjectById(String id) {
        return projectRepository.findById(id).orElse(null);
    }

    private ProjectDto convertToProjectDto(Project project) {
        return modelMapper.map(project, ProjectDto.class);
    }

    private List<ProjectDto> convertToProjectDtoList(List<Project> projects) {
        return projects.stream()
                .map(this::convertToProjectDto)
                .collect(Collectors.toList());
    }

    private ProjectItemDto convertToProjectItemDto(Project project) {
        return modelMapper.map(project, ProjectItemDto.class);
    }

    private List<ProjectItemDto> convertToProjectItemDtoList(List<Project> projects) {
        return projects.stream()
                .map(this::convertToProjectItemDto)
                .collect(Collectors.toList());
    }

    private Column createColumn(String name) {
        return columnRepository.save(new Column(name));
    }
}
