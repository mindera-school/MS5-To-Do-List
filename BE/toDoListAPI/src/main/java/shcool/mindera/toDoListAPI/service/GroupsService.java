package shcool.mindera.toDoListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shcool.mindera.toDoListAPI.repository.GroupsRepositoryInterface;

@Service
public class GroupsService {
    @Autowired
    private final GroupsRepositoryInterface groupsRepository;

    public GroupsService(GroupsRepositoryInterface groupsRepository) {
        this.groupsRepository = groupsRepository;
    }
}
