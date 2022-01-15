package com.thenetvalue.utenti.model;

public class Login {
    private String username;
    private Boolean match;

    public Login(String username, Boolean match) {
        this.username = username;
        this.match = match;
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
