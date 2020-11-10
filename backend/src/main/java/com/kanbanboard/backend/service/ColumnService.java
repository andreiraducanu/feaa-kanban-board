package com.kanbanboard.backend.service;

import com.kanbanboard.backend.model.Column;

public interface ColumnService {

    Column createColumn(String columnName);
}

