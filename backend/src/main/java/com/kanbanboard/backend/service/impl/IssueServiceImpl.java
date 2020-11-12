package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.repository.ColumnRepository;
import com.kanbanboard.backend.repository.IssueRepository;
import com.kanbanboard.backend.repository.ProjectRepository;
import com.kanbanboard.backend.repository.UserRepository;
import com.kanbanboard.backend.service.IssueService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class IssueServiceImpl implements IssueService {

    private final ModelMapper modelMapper;

    private final IssueRepository issueRepository;

    @Autowired
    IssueServiceImpl(ModelMapper modelMapper, IssueRepository issueRepository) {
        this.modelMapper = modelMapper;

        this.issueRepository = issueRepository;
    }

    @Override
    public void deleteById(String id) {
        issueRepository.deleteById(id);
    }
}
