import React from 'react';
import { EpicIcon, StoryIcon, TaskIcon, BugIcon, SubtaskIcon } from '../assets/svg/issue-type';
import { HighestIcon, HighIcon, MediumIcon, LowIcon, LowestIcon } from '../assets/svg/issue-priority';

export const ISSUE_TYPES = {
    "EPIC": { name: 'Epic', icon: <EpicIcon /> },
    "STORY": { name: 'Story', icon: <StoryIcon /> },
    "TASK": { name: 'Task', icon: <TaskIcon /> },
    "BUG": { name: 'Bug', icon: <BugIcon /> },
    "SUBTASK": { name: 'Subtask', icon: <SubtaskIcon /> }
};

export const ISSUE_PRIORITIES = {
    "HIGHEST": { name: 'Highest', icon: <HighestIcon /> },
    "HIGH": { name: 'High', icon: <HighIcon /> },
    "MEDIUM": { name: 'Medium', icon: <MediumIcon /> },
    "LOW": { name: 'Low', icon: <LowIcon /> },
    "LOWEST": { name: 'Lowest', icon: <LowestIcon /> }
};