package com.kanbanboard.backend.exception;

import com.kanbanboard.backend.dto.ServerMessageDto;
import com.kanbanboard.backend.dto.enums.ServerMessageType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(BaseException.class)
    @ResponseBody
    public ResponseEntity<ServerMessageDto> handleException(BaseException exception) {
        ServerMessageDto serverMessageDto = new ServerMessageDto(ServerMessageType.ERROR, exception.getMessage());
        return new ResponseEntity<>(serverMessageDto, exception.getStatus());
    }
}
