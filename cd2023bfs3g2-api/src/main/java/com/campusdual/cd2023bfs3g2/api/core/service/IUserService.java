package com.campusdual.cd2023bfs3g2.api.core.service;


import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.dto.EntityResult;


public interface IUserService {

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList);
	public EntityResult userInsert(Map<?, ?> attrMap);
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
	public EntityResult userDelete(Map<?, ?> keyMap);
	public EntityResult myUserQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult myUserUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
}
