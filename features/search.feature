Feature: Search Skill Academy 

Background: Open browser Skill Academy

Given User open browser skill academy

@s1
Scenario: User dapat melihat wording tidak menemukan ketika hasil search tidak ada
    When User search keyword 'asdasd' on search field
    Then User verify page hasil search tidak menemukan

@s2
Scenario: User dapat melihat data hasil search dengan keyword : DQLab
    When User search keyword 'DQLab' on search field
    Then User verify page hasil 'DQLab' on page

@s3
Scenario: User dapat melihat data hasil search dengan keyword : Tryout
    When User search keyword 'Tryout' on search field
    Then User verify page hasil 'Tryout' on page