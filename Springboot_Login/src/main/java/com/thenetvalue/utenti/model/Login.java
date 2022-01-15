package com.thenetvalue.utenti.model;

public class Login {
    private String username;
    private Boolean match;
    private Boolean validation;

    public Login(String username, Boolean match, Boolean validation) {
        this.username = username;
        this.match = match;
        this.validation = validation;
    }

    public Boolean getValidation() {
        return validation;
    }

    public void setValidation(Boolean validation) {
        this.validation = validation;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getMatch() {
        return match;
    }

    public void setMatch(Boolean match) {
        this.match = match;
    }
}
