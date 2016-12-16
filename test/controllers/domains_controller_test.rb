require 'test_helper'

class DomainsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @domain = domains(:one)
  end

  test "should get index" do
    get domains_url
    assert_response :success
  end

  test "should get new" do
    get new_domain_url
    assert_response :success
  end

  test "should create domain" do
    assert_difference('Domain.count') do
      post domains_url, params: { domain: { domain: @domain.domain } }
    end

    assert_redirected_to domain_url(Domain.last)
  end

  test "should show domain" do
    get domain_url(@domain)
    assert_response :success
  end

  test "should get edit" do
    get edit_domain_url(@domain)
    assert_response :success
  end

  test "should update domain" do
    patch domain_url(@domain), params: { domain: { domain: @domain.domain } }
    assert_redirected_to domain_url(@domain)
  end

  test "should destroy domain" do
    assert_difference('Domain.count', -1) do
      delete domain_url(@domain)
    end

    assert_redirected_to domains_url
  end
end
