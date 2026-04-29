<?php

class designation
{
    public $designation_aid;
    public $designation_is_active;
    public $designation_name;
    public $designation_category_id;
    public $designation_created;
    public $designation_updated;

    public $connection;
    public $start;
    public $total;
    public $search;
    public $lastInsertedId;

    public $tblSettingsCategory;
    public $tblSettingsDesignation;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsCategory = "settings_category";
        $this->tblSettingsDesignation = "settings_designation";
    }

    public function create()
    {
        try {
            $sql = "insert into {$this->tblSettingsDesignation}";
            $sql .= " ( ";
            $sql .= " designation_is_active, ";
            $sql .= " designation_name, ";
            $sql .= " designation_category_id, ";
            $sql .= " designation_created, ";
            $sql .= " designation_updated ";
            $sql .= ") values (";
            $sql .= " :designation_is_active, ";
            $sql .= " :designation_name, ";
            $sql .= " :designation_category_id, ";
            $sql .= " :designation_created, ";
            $sql .= " :designation_updated ";
            $sql .= " ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_name" => $this->designation_name,
                "designation_category_id" => $this->designation_category_id,
                "designation_created" => $this->designation_created,
                "designation_updated" => $this->designation_updated,
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
            $sql .= " from {$this->tblSettingsDesignation} as designation, ";
            $sql .= " {$this->tblSettingsCategory} as category ";
            $sql .= " where designation.designation_category_id = category.category_aid ";
            
            // FILTER
            $sql .= $this->designation_is_active != '' ? " and designation.designation_is_active = :designation_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " designation.designation_name like :designation_name  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->designation_is_active != '' ? ["designation_is_active" => $this->designation_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "designation_name" => "%{$this->search}%",
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
            $sql .= " from {$this->tblSettingsDesignation} as designation, ";
            $sql .= " {$this->tblSettingsCategory} as category ";
            $sql .= " where designation.designation_category_id = category.category_aid ";
            
            // FILTER
            $sql .= $this->designation_is_active != '' ? " and designation.designation_is_active = :designation_is_active " : " ";
            
            // SEARCH
            $sql .= $this->search != '' ? " and ( " : " ";
            $sql .= $this->search != '' ? " designation.designation_name like :designation_name  " : " ";
            $sql .= $this->search != '' ? " ) " : " ";
            
            // THIS IS FOR PAGINATION LIKE FACEBOOK SCROLLING
            $sql .= "limit :start, ";
            $sql .= " :total ";
            
            $query = $this->connection->prepare($sql);
            $query->execute([
                // FOR FILTER 
                ...$this->designation_is_active != '' ? ["designation_is_active" => $this->designation_is_active] : [],
                // FOR SEARCHING
                ...$this->search != '' ? [
                    "designation_name" => "%{$this->search}%",
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
            $sql =" update {$this->tblSettingsDesignation} set ";
            $sql .= " designation_name = :designation_name, ";
            $sql .= " designation_category_id = :designation_category_id, ";
            $sql .= " designation_updated = :designation_updated ";
            $sql .= " where designation_aid = :designation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_name" => $this->designation_name,
                "designation_category_id" => $this->designation_category_id,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); turn on when debugging
            $query = false;
        } return $query;
    }

    public function active(){
        try{
            $sql =" update {$this->tblSettingsDesignation} set ";
            $sql .= " designation_is_active = :designation_is_active, "; 
            $sql .= " designation_updated = :designation_updated ";
            $sql .= " where designation_aid = :designation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_is_active" => $this->designation_is_active,
                "designation_updated" => $this->designation_updated,
                "designation_aid" => $this->designation_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function delete(){
        try{
            $sql =" delete from {$this->tblSettingsDesignation} ";
            $sql .= " where designation_aid = :designation_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "designation_aid" => $this->designation_aid,
            ]);
        }catch(PDOException $e){
            // returnError($e); //turn on whe debugging
            $query = false;
        } return $query;
    }

    public function checkName(){
        try{
            $sql = "select ";
            $sql .= " designation_aid ";
            $sql .= " from {$this->tblSettingsDesignation} ";
            $sql .= " where designation_name = :designation_name ";
            
            if (!empty($this->designation_aid)) {
                $sql .= " and designation_aid != :designation_aid ";
            }
            
            $query = $this->connection->prepare($sql);
            
            // Replaced the spread operator (...) with a highly compatible standard array
            $params = [
                "designation_name" => $this->designation_name
            ];

            if (!empty($this->designation_aid)) {
                $params["designation_aid"] = $this->designation_aid;
            }
            
            $query->execute($params);
            
        }catch(PDOException $e){
            // This will instantly print the exact database error to your network tab if something is wrong
            returnError($e->getMessage());
            $query = false;
        }
        return $query;
    }

}