package com.kanbanboard.backend.service.impl;

import com.kanbanboard.backend.model.Column;
import com.kanbanboard.backend.repository.ColumnRepository;
import com.kanbanboard.backend.service.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ColumnServiceImpl implements ColumnService {

    private final ColumnRepository columnRepository;

    @Autowired
    ColumnServiceImpl(ColumnRepository columnRepository) {
        this.columnRepository = columnRepository;
    }

    @Override
    public Column createColumn(String columnName) {
        return columnRepository.save(new Column(columnName));
    }
}
