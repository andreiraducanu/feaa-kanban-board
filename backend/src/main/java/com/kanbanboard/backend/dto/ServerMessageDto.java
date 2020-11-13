package com.kanbanboard.backend.dto;

import com.kanbanboard.backend.dto.enums.ServerMessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServerMessageDto {

    private ServerMessageType type;

    private String message;
}
