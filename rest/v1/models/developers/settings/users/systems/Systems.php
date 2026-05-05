<?php

class Systems
{
    public $system_aid;
    public $system_is_active;
    public $system_first_name;
    public $system_last_name;
    public $system_email;
    public $system_password;
    public $system_key;
    public $system_role_id;
    public $system_created;
    public $system_updated;

    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $tblSettingsRoles;
    public $tblSettingsSystems;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_roles";
        $this->tblSettingsSystems = "settings_system";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsSystems}";
            $sql .= " ( ";
            $sql .= " system_is_active, ";
            $sql .= " system_first_name, ";
            $sql .= " system_last_name, ";
            $sql .= " system_email, ";
            $sql .= " system_password, ";
            $sql .= " system_key, ";
            $sql .= " system_role_id, ";
            $sql .= " system_created, ";
            $sql .= " system_updated ";
            $sql .= ") values (";
            $sql .= " :system_is_active, ";
            $sql .= " :system_first_name, ";
            $sql .= " :system_last_name, ";
            $sql .= " :system_email, ";
            $sql .= " :system_password, ";
            $sql .= " :system_key, ";
            $sql .= " :system_role_id, ";
            $sql .= " :system_created, ";
            $sql .= " :system_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_is_active" => $this->system_is_active,
                "system_first_name" => $this->system_first_name,
                "system_last_name" => $this->system_last_name,
                "system_email" => $this->system_email,
                "system_password" => $this->system_password,
                "system_key" => $this->system_key,
                "system_role_id" => $this->system_role_id,
                "system_created" => $this->system_created,
                "system_updated" => $this->system_updated,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $e) {
            $query = false;
        }
        return $query;
    }

    public function readAll(){
        try{
            // JOINING TABLE
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsSystems} as systems, ";
            $sql .= " {$this->tblSettingsRoles} as roles ";
            $sql .= " where systems.system_role_id = roles.role_aid ";
            
            // FILTER
            $sql .= $this->system_is_active != '' ? " and systems.system_is_active = :system_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " systems.system_first_name like :system_first_name  " : " ";
            $sql .= $this->search != '' ? " or systems.system_last_name like :system_last_name  " : " ";
            $sql .= $this->search != '' ? " or systems.system_email like :system_email  " : " ";
            $sql .= $this->search != '' ? " or CONCAT(systems.system_last_name,' ',systems.system_first_name) like :system_last_fullname " : " ";
            $sql .= $this->search != '' ? " or CONCAT(systems.system_first_name,' ',systems.system_last_name) like :system_first_fullname " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->system_is_active != '' ? ["system_is_active" => $this->system_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "system_first_name" => "%{$this->search}%",
                    "system_last_name" => "%{$this->search}%",
                    "system_email" => "%{$this->search}%",
                    "system_last_fullname" => "%{$this->search}%",
                    "system_first_fullname" => "%{$this->search}%",
                ] : [],
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function readLimit(){
        try{
            // JOINING TABLE
            $sql = "select ";
            $sql .= " * ";
            $sql .= " from {$this->tblSettingsSystems} as systems, ";
            $sql .= " {$this->tblSettingsRoles} as roles ";
            $sql .= " where systems.system_role_id = roles.role_aid ";
            
            // FILTER
            $sql .= $this->system_is_active != '' ? " and systems.system_is_active = :system_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " systems.system_first_name like :system_first_name  " : " ";
            $sql .= $this->search != '' ? " or systems.system_last_name like :system_last_name  " : " ";
            $sql .= $this->search != '' ? " or systems.system_email like :system_email  " : " ";
            $sql .= $this->search != '' ? " or CONCAT(systems.system_last_name,' ',systems.system_first_name) like :system_last_fullname " : " ";
            $sql .= $this->search != '' ? " or CONCAT(systems.system_first_name,' ',systems.system_last_name) like :system_first_fullname " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->system_is_active != '' ? ["system_is_active" => $this->system_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "system_first_name" => "%{$this->search}%",
                    "system_last_name" => "%{$this->search}%",
                    "system_email" => "%{$this->search}%",
                    "system_last_fullname" => "%{$this->search}%",
                    "system_first_fullname" => "%{$this->search}%",
                ] : [],
                "start" => $this->start - 1,
                "total" => $this->total,
            ]);
        }catch(PDOException $e){
            $query = false;
        }
        return $query;
    }

    public function update(){
        try{
            $sql =" update {$this->tblSettingsSystems} set ";
            $sql .= " system_first_name = :system_first_name, ";
            $sql .= " system_last_name = :system_last_name, ";
            $sql .= " system_email = :system_email, ";
            $sql .= " system_role_id = :system_role_id, ";
            $sql .= " system_updated = :system_updated ";
            $sql .= " where system_aid = :system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_first_name" => $this->system_first_name,
                "system_last_name" => $this->system_last_name,
                "system_email" => $this->system_email,
                "system_role_id" => $this->system_role_id,
                "system_updated" => $this->system_updated,
                "system_aid" => $this->system_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }
    public function setPassword(){
        try{
            $sql =" update {$this->tblSettingsSystems} set ";
            $sql .= " system_key = '', ";
            $sql .= " system_password = :system_password, ";
            $sql .= " system_updated = :system_updated ";
            $sql .= " where system_key = :system_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_password" => $this->system_password,
                "system_updated" => $this->system_updated,
                "system_key" => $this->system_key,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }
    public function readKey(){
        try{
            $sql =" select * from {$this->tblSettingsSystems} ";
            $sql .= "where system_key = :system_key ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_key" => $this->system_key,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }
    public function active(){
        try{
            $sql =" update {$this->tblSettingsSystems} set ";
            $sql .= " system_is_active = :system_is_active, "; 
            $sql .= " system_updated = :system_updated ";
            $sql .= " where system_aid = :system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_is_active" => $this->system_is_active,
                "system_updated" => $this->system_updated,
                "system_aid" => $this->system_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function delete(){
        try{
            $sql =" delete from {$this->tblSettingsSystems} ";
            $sql .= " where system_aid = :system_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "system_aid" => $this->system_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function checkName(){
        try{
            $sql = "select ";
            $sql .= " system_aid ";
            $sql .= " from {$this->tblSettingsSystems} ";
            $sql .= " where system_first_name = :system_first_name ";
            $sql .= " and system_last_name = :system_last_name ";
            
            if (!empty($this->system_aid)) {
                $sql .= " and system_aid != :system_aid ";
            }
            
            $query = $this->connection->prepare($sql);
            
            // Replaced the spread operator (...) with a highly compatible standard array
            $params = [
                "system_first_name" => $this->system_first_name,
                "system_last_name" => $this->system_last_name,
            ];

            if (!empty($this->system_aid)) {
                $params["system_aid"] = $this->system_aid;
            }
            
            $query->execute($params);
            
        }catch(PDOException $e){
            // This will instantly print the exact database error to your network tab if something is wrong
            returnError($e->getMessage());
            $query = false;
        }
        return $query;
    }

    public function checkEmail(){
        try{
            $sql = "select ";
            $sql .= " system_aid ";
            $sql .= " from {$this->tblSettingsSystems} ";
            $sql .= " where system_email = :system_email ";
            
            if (!empty($this->system_aid)) {
                $sql .= " and system_aid != :system_aid ";
            }
            
            $query = $this->connection->prepare($sql);
            
            $params = [
                "system_email" => $this->system_email,
            ];

            if (!empty($this->system_aid)) {
                $params["system_aid"] = $this->system_aid;
            }
            
            $query->execute($params);
            
        }catch(PDOException $e){
            returnError($e->getMessage());
            $query = false;
        }
        return $query;
    }
}